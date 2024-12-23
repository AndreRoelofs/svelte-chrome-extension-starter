import { Component, mount, MountOptions } from 'svelte'; // Import the original mount function

// A WeakMap to track components that have already been mounted
const mountedComponents = new WeakMap<object, boolean>();

/**
 * Overrides the default Svelte `mount` function.
 * @param target - The object to mount the component to.
 * @param options - Options passed to the `mount` function.
 * @returns The result of the original `mount` call, if the object is not already mounted.
 */
export function mountIfExists(target: Component, options: MountOptions) {
    if (mountedComponents.has(target)) {
        console.log('Component already mounted:', target);
        return null; // Prevent duplicate mounting
    }

    // Mark the target as mounted
    mountedComponents.set(target, true);

    console.log('Mounting component:', target);

    // Call the original mount function
    return mount(target, options);
}
