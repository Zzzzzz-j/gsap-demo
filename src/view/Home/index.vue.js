import './index.scss';
import { useCount } from '@/store/useCount';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { count } = storeToRefs(useCount());
function addCount() {
    count.value++;
}
function minusCount() {
    count.value--;
}
const __VLS_fnComponent = (await import('vue')).defineComponent({});
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
let __VLS_resolvedLocalAndGlobalComponents;
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("home-page") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
(__VLS_ctx.count);
const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.AButton;
/** @type { [typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ] } */
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onClick': {} }, type: ("primary"), }));
const __VLS_2 = __VLS_1({ ...{ 'onClick': {} }, type: ("primary"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.addCount)
};
let __VLS_3;
let __VLS_4;
__VLS_nonNullable(__VLS_5.slots).default;
const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
const __VLS_8 = __VLS_resolvedLocalAndGlobalComponents.AButton;
/** @type { [typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ] } */
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ ...{ 'onClick': {} }, type: ("primary"), }));
const __VLS_10 = __VLS_9({ ...{ 'onClick': {} }, type: ("primary"), }, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.minusCount)
};
let __VLS_11;
let __VLS_12;
__VLS_nonNullable(__VLS_13.slots).default;
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_8, __VLS_10);
__VLS_styleScopedClasses['home-page'];
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
            count: count,
            addCount: addCount,
            minusCount: minusCount,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
//# sourceMappingURL=index.vue.js.map