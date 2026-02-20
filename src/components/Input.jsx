export default function Input({ title, label }) {
  return (
    <p className="control">
      <label htmlFor={label}>{title}</label>
      <input type={label === "email" ? "email" : "text"} id={label} name={label} required />
    </p>
  );
}
