<script setup lang='ts'>

const props = withDefaults(
    defineProps<{
        label:string
    }>(),
    {
        label: '',
    },
);


</script>

<template>
    <div class="control-field">
        <label>{{ props.label }}</label>
        <div class="inner-control">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
.control-field {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    label {
        width: 60px;
        text-align: right;
    }
    .inner-control {
        margin-left: 10px;
    }
}
</style>
