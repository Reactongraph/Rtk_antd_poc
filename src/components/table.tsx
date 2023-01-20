import React, { useEffect, useState } from "react";
import { Table, Typography, Row, Col, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetUsersQuery } from "../services/users";

interface DataType {
  key: string;
  email: string;
  name: string;
  username: string;
  phone: string;
  website: string;
}

const { Title } = Typography;
const { Search } = Input;

function TableComponent() {
    const { data, isLoading, isSuccess } = useGetUsersQuery();
    const [searchData, setSearchData] = useState("");
    const [filterUserData, setFilteUserData] = useState<any>([]);
  console.log("datauser", data);

  const columns: ColumnsType<DataType> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
  ];

  const userListData = (data || []).map(
    ({ email, username, name, phone, website }, index: any) => ({
      key: index,
      name: name,
      username: username,
      email: email,
      phone: phone,
      website: website,
    })
    );
    
    useEffect(() => {
        if ( isSuccess && userListData?.length > 0) {
            setFilteUserData(userListData);
        }
    }, [isSuccess]);
    
    const onSearch = (value: string) => {
        let data = [...filterUserData];
        let newArr = data.filter(el => ((el.username).toLowerCase()).includes(value.toLowerCase()))
        setFilteUserData([...newArr]);
    }

    useEffect(() => {
        if (searchData.length > 0) {
            onSearch(searchData);
        }
        else {
            setFilteUserData([...userListData]);
        }
    }, [searchData]);

  return (
    <div>
      <Row style={{ marginTop: "10px", marginBottom: "10px", alignItems:'center'}}>
        <Col span={12}>
          <Title>Tables:</Title>
        </Col>
        <Col span={12}>
          <Search onSearch={onSearch} placeholder="Search" value={searchData} onChange={(e) => setSearchData(e.target.value)} />
        </Col>
      </Row>
      <Table
        pagination={false}
        loading={isLoading}
        columns={columns}
        dataSource={filterUserData}
      />
    </div>
  );
}

export default TableComponent;
