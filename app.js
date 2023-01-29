import { createSSRApp, useSSRContext } from 'vue';

const Button2 = {
  data() {
    return { count: 1 };
  },
  methods: {
    increment() {
      this.count = this.count * 2;
    },
  },
  template: /*html*/ `<button @click="count = count * 2">count is {{ count }}</button>`,
};

export function createApp() {
  return createSSRApp({
    components: { Button2 },
    computed: {
      context() {
        if (typeof window === 'undefined') {
          // Server side
          console.log('FROM CONTEXT:', useSSRContext());
          return useSSRContext();
        } else {
          // Client side
          console.log('FROM WINDOW:', window.context);
          return window.context;
        }
      },
    },
    data() {
      return { count: 1 };
    },
    template: /*html*/ `<button @click="count++">{{ count }}</button>
    <pre>{{ context }}</pre>
    <Button2></Button2>`,
  });
}
