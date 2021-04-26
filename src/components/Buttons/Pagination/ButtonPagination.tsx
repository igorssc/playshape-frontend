import Pagination from '@material-ui/lab/Pagination'
import React from 'react'
import { Container } from './ButtonPagination.style'

interface ButtonPaginationProps {
  paginate: {
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number
    nextPage: number
  }
  handlePaginate?: (searchPage: number) => void
}
export const ButtonPagination = ({
  paginate,
  handlePaginate
}: ButtonPaginationProps) => {
  return (
    <Container>
      <Pagination
        count={paginate.totalPages}
        onChange={(_, page) => {
          handlePaginate(page)
        }}
        showFirstButton
        showLastButton
      />
    </Container>
  )
}
