import React from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

import styled from 'styled-components';

import usePagination from '@hooks/usePagination';

interface Props {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
}

const Navigation = styled.nav``;

const Button = styled.button<{ selected?: boolean }>`
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  border: 0;
  margin: 0;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: normal;
  background-color: ${({ selected }) => (selected ? '#36dafa' : 'white')};
  cursor: pointer;
  border-radius: 100%;
  width: 48px;
  height: 48px;

  &:hover {
    background-color: #ccc;
    color: white;
  }

  &:active {
    opacity: 0.8;
  }
`;

const Items = styled.li``;

const ItemList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;

  ${Items} + ${Items} {
    margin-left: 8px;
  }
`;

const Pagination: React.FC<Props> = ({
  count,
  page,
  onPageChange,
  disabled,
  siblingCount,
  boundaryCount,
}) => {
  const getLabel = (item: number | string) => {
    if (typeof item === 'number') {
      return item;
    }
    if (item.indexOf('ellipsis') > -1) {
      return <AiOutlineEllipsis />;
    }
    if (item.indexOf('prev') > -1) {
      return <GrFormPrevious />;
    }
    if (item.indexOf('next') > -1) {
      return <GrFormNext />;
    }
    return null;
  };

  const { items } = usePagination({
    count,
    page,
    onPageChange,
    disabled,
    siblingCount,
    boundaryCount,
  });

  return (
    <Navigation>
      <ItemList>
        {items.map((itemProps) => {
          const {
            key,
            disabled: isDisabled,
            selected: isSelected,
            onClick,
            item,
          } = itemProps;
          return (
            <Items key={key}>
              <Button
                type="button"
                disabled={isDisabled}
                selected={isSelected}
                onClick={onClick}
              >
                {getLabel(item)}
              </Button>
            </Items>
          );
        })}
      </ItemList>
    </Navigation>
  );
};

Pagination.defaultProps = {
  disabled: false,
  siblingCount: 1,
  boundaryCount: 1,
};

export default Pagination;
