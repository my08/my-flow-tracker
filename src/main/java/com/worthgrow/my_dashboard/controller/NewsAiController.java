package com.worthgrow.my_dashboard.controller;

import com.worthgrow.my_dashboard.service.NewsAiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/news")
public class NewsAiController {

    private final NewsAiService newsAiService;

    public NewsAiController(NewsAiService newsAiService){
        this.newsAiService = newsAiService;
    }


    @GetMapping("/summary")
    public String getSummary(@RequestParam String url){
        //1. 뉴스 읽어오기.
        //String rawContent =
        //2. ai 호출
        return newsAiService.processNewsSummary(url);
    }
}
