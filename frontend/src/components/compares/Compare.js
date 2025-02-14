import { Col, Row, Select } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"

const { Option } = Select

function ChooseProduct({ products, handleChange }) {
  return (
    <>
      <Select placeholder='Select Smarthome' onChange={handleChange}>
        {products
          ? products.map((product, index) => (
              <Option key={index} value={product.id}>
                {product.name}
              </Option>
            ))
          : ""}
      </Select>
    </>
  )
}

function ProductPreview({ product }) {
  return (
    <>
      <img width='70%' src={product?.preview || ""} />
      <br />
      <br />
      <div>{product?.price ? <h3>฿ {product.price}</h3> : ""}</div>
    </>
  )
}

function Compare() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [product1, setProduct1] = useState(null)
  const [product2, setProduct2] = useState(null)
  const [product3, setProduct3] = useState(null)

  const fetchProductDetail = async (id) => {
    try {
      const url = process.env.REACT_APP_ENDPOINT + "/products/" + id
      const { data } = await axios.get(url)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = process.env.REACT_APP_ENDPOINT + "/categories"
        const { data } = await axios.get(url)
        setCategories(data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchProducts = async () => {
      try {
        const url = process.env.REACT_APP_ENDPOINT + "/products"
        const { data } = await axios.get(url)
        setProducts(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCategories()
    fetchProducts()
  }, [])

  const handleChange1 = async (value) => {
    setProduct1(await fetchProductDetail(value))
  }

  const handleChange2 = async (value) => {
    setProduct2(await fetchProductDetail(value))
  }

  const handleChange3 = async (value) => {
    setProduct3(await fetchProductDetail(value))
  }

  const getSpecDescByCategoryId = (categoryId, product) => {
    const specs = product?.specs || []
    return specs.find((spec) => spec.categoryId === categoryId)?.desc || ""
  }

  return (
    <>
      <div id='compare' className='home-page-wrapper content8-wrapper'>
        <div className='home-page content8'>
          <div className='title-wrapper' data-edit='titleWrapper'>
            <div name='image' className='title-image'>
              <img
                src='https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg'
                alt='img'
              />
            </div>
            <h1 name='title' className='title-h1'>
              <span>Smart home compares</span>
            </h1>
          </div>
          <div>
            <Row className='text-center'>
              <Col span={6}></Col>
              <Col span={6}>
                <ChooseProduct products={products} handleChange={handleChange1} />
                <ProductPreview product={product1} />
              </Col>
              <Col span={6}>
                <ChooseProduct products={products} handleChange={handleChange2} />
                <ProductPreview product={product2} />
              </Col>
              <Col span={6}>
                <ChooseProduct products={products} handleChange={handleChange3} />
                <ProductPreview product={product3} />
              </Col>
            </Row>
            {categories.map((category, index) => (
              <div className='spec-wrapper' key={index}>
                <Row>
                  <Col span={6}>{category.name}</Col>
                  <Col span={6}>{getSpecDescByCategoryId(category.id, product1)}</Col>
                  <Col span={6}>{getSpecDescByCategoryId(category.id, product2)}</Col>
                  <Col span={6}>{getSpecDescByCategoryId(category.id, product3)}</Col>
                </Row>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Compare
