<template>
    <div class="daily-article">
        <link rel="stylesheet" :href="data.css">
        <div class="headline">
            <div class="img-wrap">
                <h1 class="headline-title">{{ data.title }}</h1>
                <img :src="data.image">
                <span class="img-source">{{ data.image_source }}</span>
            </div>
        </div>
        <div class="daily-article-content" v-html="data.body"></div>
        <div class="daily-comments" v-show="comments.length">
            <span>评论（{{ comments.length }}）</span>
            <div 
                class="daily-comment"
                v-for="(comment, index) in comments"
                :key="index"
            >
                <div class="daily-comment-avatar">
                    <img :src="comment.avatar">
                </div>
                <div class="daily-comment-content">
                    <div class="daily-comment-name">{{ comment.arthor }}</div>
                    <div class="daily-comment-time" v-time="comment.time"></div>
                    <div class="daily-comment-text">{{ comment.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from '../libs/util';
import Time from '../directives/time';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default {
    directives: { Time },
    props: {
        id: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            data: {},
            loaded: false,
            comments: []
        }
    },
    watch: {
        id(val) {
            if(val) this.getArticle();
        }
    },
    methods: {
        getArticle() {
            NProgress.start();
            $.ajax.get(`news/${this.id}`)
            .then(res => {
                res.body = res.body
                    .replace(/src="http/g, `src="${$.imgPath}http`)
                res.body = res.body
                    .replace(/src="https/g, `src="${$.imgPath}https`)
                res.image = $.imgPath + res.image;
                this.data = res;
                window.scrollTo(0, 0)
                this.getComments();
                NProgress.done();
            })
        },
        getComments() {
            this.comments = [];
            $.ajax.get(`story/${this.id}/short-comments`)
            .then(res => {
                this.comments = res.comments.map(comment => {
                    comment.avatar = $.imgPath + comment.avatar;
                    return comment;
                })
            })
        }
    }
    
}
</script>
