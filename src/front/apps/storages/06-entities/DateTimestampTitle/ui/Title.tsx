export const StoragesDateTimestampTitle = ({ timestamp }: { timestamp: number }) => {
  return (
    <>
      {timestamp > 10000000000 ? (
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
