import { mount } from '@vue/test-utils'
import vpaginate from '@/components/vpaginate.vue'

const wrapper = mount(vpaginate)
const vm = wrapper.vm;

console.log(wrapper);