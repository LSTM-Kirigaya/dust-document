<template>
    <div class="detail-url-wrapper">
        <div class="detail-url-container"
            @click="click()"
        >
            <div class="cover">
                <img :src="blockLogo" class="display-image">
            </div>
            <div class="main">
                <div class="title">
                    {{ blockTitle }}
                </div>
                <div class="desc">
                    <span>{{ props.desc }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, defineProps, computed } from 'vue';

import { webUrl } from './detail-url';

defineComponent({
    name: 'detail-url'
});

const props = defineProps({
    href: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: 'https://avatars.githubusercontent.com/u/59416203?v=4'
    },
    desc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    }
});

const blockTitle = computed(() => {
    if (props.title) {
        return props.title;
    } else {
        try {
            const url = new URL(props.href);
            return url.hostname;
        } catch (error) {
            return 'No Title';
        }
    }
});

const blockLogo = computed(() => {
    if (props.logo.startsWith('http')) {
        return props.logo;
    } else {
        const url = webUrl[props.logo];
        if (url) {
            return url;
        } else {
            return props.logo;
        }
    }
})

function click() {
    window.open(props.href, '_blank');
}

</script>

<style>
.detail-url-wrapper {
    width: 100%;
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
}

.detail-url-container {
    padding: 0px 10px;
    width: 80%;
    border-radius: .8rem;
    background-color: rgba(93, 103, 232, 0.1);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: var(--animation-5s);
}


.detail-url-container:hover {
    background: linear-gradient(
                    90deg, 
                    rgba(254, 125, 55, 0.1) 25%,
                    rgba(93, 103, 232, 0.1) 37%,
                    rgba(255, 255, 255, 0) 63%
                );
    background-size: 400% 100%;
    animation: loading-mask 1.4s cubic-bezier(0.23,1,0.32,1);
    transition: var(--animation-5s);
}

.detail-url-container .cover {
    position: relative;
    overflow: hidden;
    height: 60px;
    width: 60px;
    overflow: hidden;
    border-radius: 0.6em;
}

.detail-url-container .main {
    margin: 15px;
}

.detail-url-container .title {
    font-size: 1.0rem;
    font-weight: 800;
    margin-bottom: 5px;
}

.detail-url-container .desc {
    font-size: 0.9rem;
}


.display-image {
    position: absolute;
    top: 50%;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transform: translateY(-50%);
}

</style>