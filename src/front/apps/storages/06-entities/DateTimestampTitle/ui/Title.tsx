export const StoragesDateTimestampTitle = ({ timestamp }: { timestamp: number | nil }) => {
  return (
    <>
      {timestamp == null ? (
        <span className="text-xKO">Дата не выбрана</span>
      ) : (
        new Date(timestamp * 100000).toLocaleDateString('ru', {
          day: 'numeric',
          month: 'long',
          year: '2-digit',
        })
      )}
    </>
  );
};
