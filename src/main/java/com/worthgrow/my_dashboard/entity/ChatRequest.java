package com.worthgrow.my_dashboard.entity;
import java.util.List;

public class ChatRequest {
    public String model = "gpt-4o";
    public List<Message> messages;

    public ChatRequest(String prompt, String content) {
        this.messages = List.of(
                new Message("system", "너는 경제 뉴스 전문 요약가야. 핵심을 3줄로 요약해줘."), // 시스템 프롬프트
                new Message("user", prompt + "\n\n" + content) // 사용자 프롬프트 + 뉴스 본문
        );
    }

    public record Message(String role, String content) {}
}