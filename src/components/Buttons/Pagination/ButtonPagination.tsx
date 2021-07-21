import Pagination from '@material-ui/lab/Pagination'
import React from 'react'
import { useBackdrop } from '../../../hooks/UseBackdrop'
import { usePaginate } from '../../../hooks/UsePaginate'
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
  handlePaginate?: (
    search: string,
    searchPage: number,
    type?: 'find' | 'search'
  ) => Promise<void>
}
export const ButtonPagination = ({
  paginate,
  handlePaginate
}: ButtonPaginationProps) => {
  const { search, type } = usePaginate()

  const { handleOpen, handleClose } = useBackdrop()

  return (
    <Container>
      <Pagination
        count={paginate.totalPages}
        onChange={(_, page) => {
          handleOpen()
          handlePaginate(search, page, type)
          setTimeout(() => handleClose(), 50)
        }}
        showFirstButton
        showLastButton
      />
    </Container>
  )
}
