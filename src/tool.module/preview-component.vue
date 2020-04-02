<template>
    <div class="tool-preview">
        <iframe class="iframe" :src="url"></iframe>
    </div>
</template>
<style lang="scss" scoped>
    .tool-preview {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #333333;
    }

    .iframe {
        width: 380px;
        height: 680px;
        border: none;
        display: block;
        margin: 100px auto;
        border-radius: 6px;
    }
</style>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Utils from '../utils/utils';


    @Component({})
    export default class ToolPreviewComponent extends Vue {
        public url: string = '';

        public mounted() {
            this.url = Utils.getParam('url') || '';
        }
    }
</script>

