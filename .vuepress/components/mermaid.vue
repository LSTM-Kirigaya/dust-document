<template>
	<div class="mermaid">
		<slot></slot>
	</div>
</template>

<script setup>
import { defineComponent, onMounted, useSlots } from 'vue';

import mermaid from 'mermaid';

defineComponent({ name: 'mermaid' })

onMounted(async () => {
    mermaid.initialize({
        startOnLoad: true,
        securityLevel: 'loose'
    });
    const slots = useSlots();
    if (slots.default) {
        const vnode = slots.default()[0];
        const code = vnode.children;        
        const svg = await mermaid.mermaidAPI.render('mermaid', vnode.children?.toString() || '');        
    }
    
});
</script>