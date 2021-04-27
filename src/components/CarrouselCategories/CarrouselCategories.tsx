import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import {
  Ball,
  Container,
  Content,
  SampleArrow
} from './CarrouselCategories.style'

interface CarrouselCategoriesProps {
  categories: {
    _id: string
    name: string
    slug: string
  }[]
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <SampleArrow className={className} style={{ ...style }} onClick={onClick} />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <SampleArrow className={className} style={{ ...style }} onClick={onClick} />
  )
}

export const CarrouselCategories = ({
  categories
}: CarrouselCategoriesProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <Container>
      <Content>
        <Slider {...settings}>
          {categories.map(category => (
            <Link href={`/category/${category.slug}`} key={category._id}>
              <a>
                <Ball>
                  <div>
                    <h3>{category.name}</h3>
                  </div>
                </Ball>
              </a>
            </Link>
          ))}
        </Slider>
      </Content>
    </Container>
  )
}
