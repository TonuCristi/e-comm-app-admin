import { Dispatch, SetStateAction, useCallback } from "react";
import styled from "styled-components";

import Button from "./Button";

type Props = {
  pageNr: number;
  setPageNr: Dispatch<SetStateAction<number>>;
  dataPerPage: number;
  dataCount: number;
};

type VariantProps = {
  $variant: "regular" | "current";
};

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
`;

const PageNrs = styled.span`
  font-size: 2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Page = styled.button<VariantProps>`
  background: none;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  border: 3px solid
    ${(props) =>
      props.$variant === "current" ? "var(--color-indigo-50)" : "transparent"};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  cursor: pointer;
`;

export default function Pagination({
  pageNr,
  setPageNr,
  dataPerPage,
  dataCount,
}: Props) {
  const maxPage: number = Math.ceil(dataCount / dataPerPage);

  const pages = useCallback(() => {
    const pagesArr = [];

    for (let i = 1; i <= maxPage; i++) {
      pagesArr.push(i);
    }

    return pagesArr;
  }, [maxPage]);

  const getLeftLimit = () => {
    if (pageNr <= 2) return 0;
    if (pageNr >= maxPage - 3) return maxPage - 3;
    return pageNr;
  };

  const getRightLimit = () => {
    if (pageNr <= 2) return 3;
    if (pageNr > 2 && pageNr < maxPage - 3) return pageNr + 3;
    return maxPage;
  };

  return (
    <StyledPagination>
      <Button
        variant="regular"
        onClick={() => setPageNr((prev) => (prev > 0 ? prev - 1 : prev))}
      >
        Prev
      </Button>

      <PageNrs>
        {pageNr >= 3 && (
          <>
            <Page $variant="regular" onClick={() => setPageNr(0)}>
              1
            </Page>
            <Page $variant="regular">...</Page>
          </>
        )}

        {pages()
          .slice(getLeftLimit(), getRightLimit())
          .map((page) => (
            <Page
              key={page}
              $variant={page === pageNr + 1 ? "current" : "regular"}
              onClick={() => setPageNr(page - 1)}
            >
              {page}
            </Page>
          ))}

        {pageNr <= maxPage - 4 && (
          <>
            <Page $variant="regular">...</Page>
            <Page $variant="regular" onClick={() => setPageNr(maxPage - 1)}>
              {maxPage}
            </Page>
          </>
        )}
      </PageNrs>

      <Button
        variant="regular"
        onClick={() =>
          setPageNr((prev) => (prev < maxPage - 1 ? prev + 1 : prev))
        }
      >
        Next
      </Button>
    </StyledPagination>
  );
}
