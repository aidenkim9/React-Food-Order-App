export default function Modal({ children, ref }) {
  return (
    <dialog className="modal" ref={ref}>
      {children}
    </dialog>
  );
}
