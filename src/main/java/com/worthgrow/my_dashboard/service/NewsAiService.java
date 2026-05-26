package com.worthgrow.my_dashboard.service;

import com.worthgrow.my_dashboard.entity.ChatRequest;
import org.jsoup.Jsoup;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.HierarchicalBeanFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.jsoup.nodes.Document;

import java.io.IOException;

@Service
public class NewsAiService {

    @Value("${chatgpt.api.key}")
    private String apikey;

    private final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    public String processNewsSummary(String url){
        String rawContent = fetchContent(url);
        String summary = summarizeNews(rawContent);
        return summary;
    }

    private String fetchContent(String url) {
        try {
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0")
                    .timeout(5000)
                    .get();

            Elements paragraphs = doc.select(".article-select p");

            return paragraphs.text();
        } catch (IOException e) {
            return "본문 추출 또는 요약 실패: " + e.getMessage();
        }

    }

    public String summarizeNews(String content){
        RestTemplate restTemplate = new RestTemplate();
        //1. Header
        HttpHeaders header = new org.springframework.http.HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.setBearerAuth(apikey);
        String myPrompt = "다음 뉴스를 한국어로 번역하고 핵심 내용을 3줄로 요약해줘.";
        ChatRequest request = new ChatRequest(myPrompt, content);

        //3. api 호출
        HttpEntity<ChatRequest> entity = new HttpEntity<>(request, header);
        ResponseEntity<String> response = restTemplate.postForEntity(OPENAI_URL, entity, String.class);

        return response.getBody();


    }
}
