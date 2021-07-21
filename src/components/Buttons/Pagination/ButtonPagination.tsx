import Pagination from '@material-ui/lab/Pagination'
import React from 'react'
import { useBackdrop } from '../../../hooks/UseBackdrop'
import { usePaginate } from '../../../hooks/UsePaginate'
import { Container } from './ButtonPagination.style'

export const ButtonPagination = () => {
  const { search, type } = usePaginate()

  const { handleOpen, handleClose } = useBackdrop()

  const { paginate, handlePaginate } = usePaginate()

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
