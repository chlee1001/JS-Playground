interface Props {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
}

const usePagination = ({
  count,
  page,
  onPageChange,
  disabled,
  siblingCount = 1,
  boundaryCount = 1,
}: Props) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;

    return Array.from({ length }).map((_, index) => index + start);
  };

  const startPage = 1;
  const endPage = count;

  const startPages = range(startPage, Math.min(boundaryCount, endPage));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count,
  );

  const siblingsStart = Math.max(
    Math.min(
      page + 1 - siblingCount,
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + 1 + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : endPage - 1,
  );

  const startEllipsis = () => {
    if (siblingsStart > boundaryCount + 2) {
      return ['start-ellipsis'];
    }
    if (boundaryCount + 1 < count - boundaryCount) {
      return [boundaryCount + 1];
    }
    return [];
  };
  const endEllipsis = () => {
    if (siblingsEnd < count - boundaryCount - 1) {
      return ['end-ellipsis'];
    }
    if (count - boundaryCount > boundaryCount + 1) {
      return [count - boundaryCount];
    }
    return [];
  };

  const itemList = [
    'prev',
    ...startPages,
    ...startEllipsis(),

    ...range(siblingsStart, siblingsEnd),

    ...endEllipsis(),
    ...endPages,
    'next',
  ];

  const items = itemList.map((item, index) =>
    typeof item === 'number'
      ? {
          key: index,
          onClick: () => onPageChange(item - 1),
          disabled,
          selected: item - 1 === page,
          item,
        }
      : {
          key: index,
          onClick: () => onPageChange(item === 'next' ? page + 1 : page - 1),
          disabled:
            disabled ||
            item.indexOf('ellipsis') > -1 ||
            (item === 'next' ? page >= count - 1 : page - 1 < 0),
          selected: false,
          item,
        },
  );
  return { items };
};

export default usePagination;
