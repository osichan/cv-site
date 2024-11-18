package org.taskmanagement.app.oleksiicv.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.taskmanagement.app.oleksiicv.dto.PathRequest;

import javax.xml.bind.DatatypeConverter;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("github")
@Slf4j
public class GitHubRestController {

    @Value("${token}")
    private String TOKEN;
    @Value("${name}")
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
            List<Map<String, Object>> repos = response.getBody();
            if (repos != null) {
                return repos.stream()
                        .filter(repo -> {
                            boolean isPublic = !Boolean.parseBoolean(repo.get("private").toString());
                            String ownerLogin = ((Map<String, Object>) repo.get("owner")).get("login").toString();
                            return isPublic && ownerLogin.equals(USER);}
                        )
                        .map(repo -> Map.of(
                                "name", repo.get("name").toString(),
                                "type", "repo"
                        ))
                        .toList();
            } else {
                return Map.of("message", "No repositories found");
            }
        } else {
            return Map.of(
                    "status", response.getStatusCodeValue(),
                    "error", response.getBody()
            );
        }
    }

    @GetMapping("/profile")
    public Map<String, Object> getUserProfile() {
        String url = "https://api.github.com/user";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                Map.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> profileData = response.getBody();

            return Map.of(
                    "login", Objects.toString(profileData.get("login"), ""),
                    "avatar_url", Objects.toString(profileData.get("avatar_url"), ""),
                    "name", Objects.toString(profileData.get("name"), ""),
                    "location", Objects.toString(profileData.get("location"), ""),
                    "email", Objects.toString(profileData.get("email"), ""),
                    "bio", Objects.toString(profileData.get("bio"), "")
            );
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
            return result.stream().map(element ->
                    Map.of(
                         "name", element.get("name"),
                         "type", element.get("type")
                    )
            ).toList();
        } else {
            return Map.of(
                    "status", response.getStatusCodeValue(),
                    "error", response.getBody()
            );
        }
    }

    @PostMapping("{id}/contents")
    public Object getFileOrDirectory(@PathVariable("id") String repoName, @RequestBody PathRequest path) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://api.github.com/repos/%s/%s/contents/%s".formatted(USER, repoName, path.getPath());

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
                return ((List<Map<String, Object>>) responseBody).stream().map(element ->
                        Map.of(
                                "name", element.get("name"),
                                "type", element.get("type")
                        )
                ).toList();
            } else if (responseBody instanceof Map) {
                Map<String, Object> fileInfo = (Map<String, Object>) responseBody;
                String content = (String) fileInfo.get("content");

                try {
                    return new String(DatatypeConverter.parseBase64Binary(content));
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
