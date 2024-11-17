package org.taskmanagement.app.oleksiicv.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.xml.bind.DatatypeConverter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("github")
public class GitHubRestController {

    @Value("token")
    private String TOKEN;
    @Value("name")
    private String USER = "";
    private static final String URL_FOR_GET_ALL_REPOS = "https://api.github.com/user/repos";
    private List<Map<String, Object>> repos = null;

    @GetMapping()
    public Object printRepos() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<List> response = restTemplate.exchange(
                URL_FOR_GET_ALL_REPOS,
                HttpMethod.GET,
                entity,
                List.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            repos = response.getBody();
            return repos.stream()
                    .map(repo -> repo.get("name"))
                    .toList();
        } else {
            return Map.of(
                    "status", response.getStatusCodeValue(),
                    "error", response.getBody()
            );
        }
    }

    @GetMapping("{id}")
    public Object getRepo(@PathVariable("id") String id) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<List> response = restTemplate.exchange(
                "https://api.github.com/repos/%s/%s/contents".formatted(USER, id),
                HttpMethod.GET,
                entity,
                List.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            List<Map<String, Object>> result = response.getBody();
            return result.stream().map(element -> element.get("name"));
        } else {
            return Map.of(
                    "status", response.getStatusCodeValue(),
                    "error", response.getBody()
            );
        }
    }

    @GetMapping("{id}/{path}")
    public Object getFileOrDirectory(@PathVariable("id") String repoName, @PathVariable("path") String path) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://api.github.com/repos/%s/%s/contents/%s".formatted(USER, repoName, path);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Object> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                Object.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            Object responseBody = response.getBody();

            if (responseBody instanceof List) {
                return responseBody;
            } else if (responseBody instanceof Map) {
                Map<String, Object> fileInfo = (Map<String, Object>) responseBody;
                String content = (String) fileInfo.get("content");

                System.out.println(content);

                try {
                    byte[] decodedContent = DatatypeConverter.parseBase64Binary(content);
                    return new String(decodedContent);
                } catch (IllegalArgumentException e) {
                    return Map.of(
                            "error", "Invalid Base64 content",
                            "details", e.getMessage()
                    );
                }
            }
        }

        return Map.of(
                "status", response.getStatusCodeValue(),
                "error", response.getBody()
        );
    }
}
