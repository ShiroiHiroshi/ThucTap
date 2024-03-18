<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `layout/images/LogoDang.jpg`;
});

const isLoggedIn = ref(localStorage.getItem('accessToken') !== null);

const onLogin = () => {
    router.push('/Login');
};

const onLogout = () => {
    localStorage.removeItem('accessToken');
    isLoggedIn.value = false;
    router.replace('/Login');
};

const onUser = () => {
    router.push('/UserInfo');
};

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/documentation');
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};

const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>Quản lý công tác đảng và đảng viên</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div v-if="!isLoggedIn" class="layout-topbar-menu" :class="topbarMenuClasses">
            <button @click="onLogin" class="p-link layout-topbar-button">
                LOGIN              
            </button>
            <button class="p-link layout-topbar-button">
                SIGNUP
            </button>
        </div>
        <div v-else class="layout-topbar-menu" :class="topbarMenuClasses">
            <button class="p-link layout-topbar-button">
                <i class="pi pi-bell"></i>
                <span>Notification</span>           
            </button>
            <button @click="onLogout" class="p-link layout-topbar-button">
                <i class="pi pi-sign-out"></i>
                <span>Logout</span>
            </button>
            <button @click="onUser()" class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
