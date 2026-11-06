export function Contador({ pendentes, total }) {
  return (
    <p className="contador">
      {pendentes} pendentes de {total}
    </p>
  );
}
