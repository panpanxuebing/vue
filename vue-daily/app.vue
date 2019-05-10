<template>
    <div class="daily">
        <div class="daily-menu">
            <div 
                class="daily-menu-item"
                :class="{ on: type === 'recommand' }"
                @click="handleToRecommand"
            >每日推荐</div>
        </div>
        <div class="daily-list" ref="list">
            <template v-if="type === 'recommand'">
                <div v-for="list in recommandList" :key="list.date">
                    <div class="daily-date">{{ list.date | formatDay }}</div>
                    <Item
                        v-for="item in list.stories"
                        :key="item.id"
                        :data="item"
                        @click.native="articleId = item.id"
                    ></Item>
                </div>
            </template>
        </div>
        <daily-article :id="articleId"></daily-article>
    </div>
</template>
<script>
import $ from './libs/util';
import Item from './components/Item.vue';
import dailyArticle from './components/daily-article.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default {
    components: { Item, dailyArticle },
    data() {
        return {
            type:  'recommand',
            recommandList: [],
            dailyTime: $.getTodayTime(),
            isLoading: false,
            articleId: 0
        }
    },
    filters: {
        formatDay(date) {
            let month = date.substr(4, 2);
            let day =date.substr(6, 2);
            if(month.substr(0, 1) === '0') month = month.substr(1, 1)
            if(day.substr(0, 1) === '0') day = day.substr(1, 1);
            return `${month} 月 ${day} 日`
        }
    },
    methods: {
        handleToRecommand() {
            this.type = 'recommand';
            this.recommandList = [];
            this.dailyTime = $.getTodayTime();
            this.getRecommandList();
        },
        getRecommandList() {
            this.isLoading = true;
            NProgress.start();
            const prevDay = $.getPrevDay(this.dailyTime + 86400000);
            $.ajax.get(`news/before/${prevDay}`)
            .then(res => {
                this.recommandList.push(res);
                if(!this.articleId) {
                    this.articleId = res.stories[0].id;
                }
                this.isLoading = false;
                NProgress.done();
            })
        }
    },
    mounted() {
        this.getRecommandList();

        const $list = this.$refs.list;
        $list.addEventListener('scroll', () => {
            if(this.isLoading) return;
            if(
                $list.scrollTop
                + document.body.clientHeight
                >= $list.scrollHeight
            ) {
                this.dailyTime -= 86400000;
                this.getRecommandList();
            }
        })
        $list.onmousewheel = (e) => {
            e = e || window.event;
            
            if(this.isLoading) return;
            if($list.scrollHeight - $list.clientHeight === 0) {
                if(e.wheelDelta < 0) {
                    console.log('向下滑动');
                    this.dailyTime -= 86400000;
                    this.getRecommandList();
                }
            }
        }
    }
}
</script>