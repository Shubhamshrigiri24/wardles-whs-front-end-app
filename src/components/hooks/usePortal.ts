import { useRef, useEffect } from "react";

/**
 * Finds the root portal element if available within the dom,
 * otherwise creates one on the body
 */
function getParentEl(id: string) {
  const parentEl = document.getElementById(id);

  if (parentEl) {
    return parentEl;
  }

  const rootEl = document.createElement("div");
  rootEl.setAttribute("id", id);
  document.body.appendChild(rootEl);

  return rootEl;
}

/**
 * Hook to create a portal
 * @example
 * const target = usePortal(id);
 * return createPortal(children, target);
 */
function usePortal(id: string) {
  const rootElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const parentEl = getParentEl(id);

    parentEl.appendChild(rootElRef.current as HTMLDivElement);

    return function removeElement() {
      rootElRef.current?.remove();
    };
  }, [id]);

  /**
   * We need to create this lazily so that it's only ever run once.
   * Usually you would need to do
   * `const rootElRef = useRef(document.createElement("div"));`
   * but this would happen on every render which we definitely don't want here
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  function getRootEl() {
    if (!rootElRef.current) {
      rootElRef.current = document.createElement("div");

      rootElRef.current.setAttribute("id", `${id}-inner`);
    }
    return rootElRef.current;
  }

  return getRootEl();
}

export default usePortal;
