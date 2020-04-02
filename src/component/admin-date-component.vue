<template>
    <div class="admin-date">
        <div class="text">{{label}}</div>
        <a-range-picker v-if="defaultValue!=null && defaultValue.length > 0" class="picker" @change="change"
                        :locale="locale" :defaultValue="defaultValue"/>
    </div>
</template>

<style lang="scss">
    .admin-date {
        display: flex;
        line-height: 30px;
        height: 32px;
        background: #fff;
        border: 1px solid #ddd;
        width: 300px;
        box-sizing: border-box;

        & .text {
            padding: 0 8px;
            font-size: 12px;
            background: #efefef;
            text-align: center;
            border-right: 1px solid #ddd;
        }

        & .picker {
            border: none;
            margin: 0;
            font-size: 12px;
            outline: none;
            flex: 1;
            width: 100%;

            & .ant-input {
                border: none;
                height: 30px !important;
                box-shadow: none !important;
            }
        }


    }
</style>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import moment from 'moment';
    import Utils from '../utils/utils';

    const s = new Date();
    const e = new Date(new Date().getTime() - 2592000000);

    @Component
    export default class AdminDateComponent extends Vue {
        @Prop({
            type: String,
            default: ''
        })
        public label: string;

        @Prop({
            type: Date,
            default: () => s
        })
        public defaultStartTime: Date;

        @Prop({
            type: Date,
            default: () => e
        })
        public defaultEndTime: Date;

        public locale = {
            "lang": {
                "placeholder": "Select date",
                "rangePlaceholder": ["开始日期", "结束日期"],
                "today": "今天",
                "now": "此刻",
                "backToToday": "返回今天",
                "ok": "确定",
                "clear": "清除",
                "month": "月",
                "year": "年",
                "timeSelect": "选择时间",
                "dateSelect": "选择日期",
                "monthSelect": "选择月份",
                "yearSelect": "选择年份",
                "decadeSelect": "选择年代",
                "yearFormat": "YYYY年",
                "dateFormat": "YYYY年M月D日",
                "dayFormat": "D日",
                "dateTimeFormat": "YYYY年M月D日 HH时mm分ss秒",
                "monthFormat": "MMMM",
                "monthBeforeYear": true,
                "previousMonth": "上个月 (翻页上键)",
                "nextMonth": "下个月 (翻页下键)",
                "previousYear": "上一年 (Control键加左方向键)",
                "nextYear": "下一年 (Control键加右方向键)",
                "previousDecade": "上一年代",
                "nextDecade": "下一年代",
                "previousCentury": "上一世纪",
                "nextCentury": "下一世纪"
            },
            "timePickerLocale": {
                "placeholder": "选择时间"
            },
            "dateFormat": "YYYY-MM-DD",
            "dateTimeFormat": "YYYY-MM-DD HH:mm:ss",
            "weekFormat": "YYYY-wo",
            "monthFormat": "YYYY-MM"
        };
        public defaultValue: any[] = [];

        public mounted() {
            const startTime = Utils.dateFormat('yyyy/MM/dd', this.defaultStartTime);
            const endTime = Utils.dateFormat('yyyy/MM/dd', this.defaultEndTime);
            this.defaultValue = [moment(startTime, 'YYYY/MM/DD'), moment(endTime, 'YYYY/MM/DD')];
            this.$emit('change', [startTime, endTime]);
        }

        public change(e: any) {
            if (e.length < 1) {
                this.$emit('change', []);
                return;
            }
            let date = e[0].toDate();
            const date1 = date.getFullYear() + '-' + (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) + ' ' + date.getHours() + ':' + date.getMinutes();
            date = e[1].toDate();
            const date2 = date.getFullYear() + '-' + (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) + ' ' + date.getHours() + ':' + date.getMinutes();
            this.$emit('change', [date1, date2]);
        }


    }


</script>