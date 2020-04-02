<template>
    <admin-frame-component>
        <div class="merchant">
            <router-view/>
        </div>
    </admin-frame-component>
</template>
<style lang="scss" scoped>
    .data {
        font-size: 13px;
    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import AdminFrameComponent from "../component/admin-frame-component.vue";

    @Component({
        components: {AdminFrameComponent}
    })
    export default class Merchant extends Vue {
    }
</script>