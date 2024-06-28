
<script lang="ts">
    import { onMount } from 'svelte';
    let pdfUrl: string | null = null;
    let userId = 1;

    async function fetchPDF(userId: string) {
        try {
            const response = await fetch(`/api/getPdf?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            pdfUrl = URL.createObjectURL(blob);
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
    }

    function downloadPDF() {
        if (pdfUrl) {
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = `cv-${userId}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    onMount(() => {
        fetchPDF(userId.toString());
    });
</script>

<button on:click={downloadPDF}>Download PDF</button>

{#if pdfUrl}
    <embed src={pdfUrl} width="900" height="700" type="application/pdf" />
{/if}

<style>
    button {
        margin: 20px;
    }
</style>
