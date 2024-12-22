<script>
export let text = 'Click me';

function handleClick() {
    alert('Button clicked!');
}
</script>

<button on:click={handleClick}>
    {text}
</button>

<style>
button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

button:hover {
    background-color: #0069d9;
}
</style>
