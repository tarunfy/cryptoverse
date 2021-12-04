import React, { useState } from "react";
import { Select, Typography, Col, Row, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImg =
  "https://www.hedgewithcrypto.com/static/086ab2d54b40c45f7c38a87bcbb1e93c/61f71/d5777d536a1e34278b1ead6b066abe26a12d4449-1200x600.webp";

function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("crypto");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 18,
  });
  const { data } = useGetCryptosQuery(100);

  console.log(cryptoNews);

  if (isFetching) {
    return "Loading...";
  }

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.className.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="crypto">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  src={news.image || demoImg}
                  alt="news"
                  className="news-img"
                />
              </div>
              <p>
                {news.summary > 100
                  ? `${news.summary.substring(0, 100)}...`
                  : news.summary}
              </p>
              <div className="provider-container">
                <div>
                  <Text>{news["sub_title"]}</Text>
                </div>
                <div>
                  <Text>{moment(news.dateLong).startOf("ss").fromNow()}</Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default News;
