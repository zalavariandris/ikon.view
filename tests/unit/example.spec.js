// this test is experimental for now.

import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import ArtistBio from '@/components/ArtistBio.vue'
import { RouterLinkStub } from '@vue/test-utils';
import VueRouter from 'vue-router'
import routes from '@/router/routes.js'

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter({
  mode: 'abstract', 
  routes
});

describe('ArtistBio.vue', () => {
  it('renders exhibition titles and gallery names', () => {

	const exhibitions = [{
      	ikonid: 1,
      	title: "POSZTADOKKAPOKALIPTIKUS",
      	opening: "2019-09-27 19:00:00",
      	isExhibition: 1,
      	relation: "exhibiting",
      	artistsCount: 6,
      	gallery_id: 65,
      	gallery_name: "Trafó Galéria",
      	gallery_exhibition_count: 193
      }];

  	const wrapper = mount(ArtistBio, {
      localVue,
      router,
  		propsData: {
  			exhibitions: exhibitions
  		}
  	});


    // gallery titles
    expect(wrapper.html()).toContain("2019")

    // check for exhibition titles
    expect(wrapper.html()).toContain("POSZTADOKKAPOKALIPTIKUS")
    // gallery titles
    expect(wrapper.html()).toContain("Trafó Galéria")

    // links to exhibition and gallery
    expect(wrapper.findAll('a').at(0).attributes('href')).toContain(1)
    expect(wrapper.findAll('a').at(1).attributes('href')).toContain(65)
  })
})
