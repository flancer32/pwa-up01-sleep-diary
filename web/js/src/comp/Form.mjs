import store from '../mod/Store.mjs';

const template = `
<div>
    <div style="display: grid; grid-template-columns: 1fr auto; grid-gap: var(--size-md);">
        <n-input v-model:value="sleep" type="text" placeholder="Enter your sleep data"/>
        <n-button type="primary" v-on:click="onSave">Save</n-button>
    </div>
    <ul>
        <li v-for="one in items">{{one.data}}</li>
    </ul>
</div>
`;
export default {
    template,
    components: {},
    data() {
        return {
            sleep: null,
            items: [],
        };
    },
    methods: {
        onSave() {
            store.create(this.sleep)
                .then(async () => {this.items = await store.list();})
                .catch(console.error);

        },
    },
    async mounted() {
        this.items = await store.list();
    },
}