const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps({
    prefix: {
        type: String,
        default: 'icon',
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: 'currentColor',
    },
    size: {
        type: String,
        default: '1em',
    },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        prefix: {
            type: String,
            default: 'icon',
        },
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: 'currentColor',
        },
        size: {
            type: String,
            default: '1em',
        },
    },
});
;
let __VLS_functionalComponentProps;
const __VLS_ctxBase = {};
const __VLS_ctx = __VLS_ctxBase;
let __VLS_name;
const __VLS_localComponents = {
    ...{},
    ...{},
    ...__VLS_ctxBase,
};
let __VLS_components;
let __VLS_styleScopedClasses;
// CSS variable injection 
// CSS variable injection end 
let __VLS_resolvedLocalAndGlobalComponents;
__VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ "aria-hidden": ("true"), ...{ class: ("svg-icon") }, ...{ style: (('width:' + __VLS_ctx.size + ';height:' + __VLS_ctx.size)) }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.use)({ "xlink:href": ((__VLS_ctx.symbolId)), fill: ((__VLS_ctx.color)), });
__VLS_styleScopedClasses['svg-icon'];
var __VLS_slots;
var __VLS_inheritedAttrs;
const __VLS_refs = {};
const __VLS_templateResult = { slots: __VLS_slots,
    refs: $refs,
    attrs: {},
};
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            symbolId: symbolId,
        };
    },
    props: {
        prefix: {
            type: String,
            default: 'icon',
        },
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: 'currentColor',
        },
        size: {
            type: String,
            default: '1em',
        },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        prefix: {
            type: String,
            default: 'icon',
        },
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: 'currentColor',
        },
        size: {
            type: String,
            default: '1em',
        },
    },
});
;
//# sourceMappingURL=SvgIcon.vue.js.map