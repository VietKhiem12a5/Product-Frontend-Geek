import { Table, Avatar } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/userService";
import { Link } from "react-router-dom";

export default function UserList() {
  const { data, isLoading } = useQuery(["users"], fetchUsers);

  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Avatar",
      render: (_, record) => (
        <Avatar src={`https://ui-avatars.com/api/?name=${record.name}`} alt={record.name} />
      ),
    },
    {
      title: "Name",
      render: (_, record) => (
        <Link to={`/users/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "Email",
      render: (_, record) => (
        <a href={`mailto:${record.email}`}>{record.email}</a>
      ),
    },
    {
      title: "Phone",
      render: (_, record) => (
        <a href={`tel:${record.phone}`}>{record.phone}</a>
      ),
    },
    {
      title: "Website",
      render: (_, record) => (
        <a href={`http://${record.website}`} target="_blank" rel="noopener noreferrer">
          {record.website}
        </a>
      ),
    },
  ];

  if (isLoading) return <p>Loading...</p>;

  return <Table dataSource={data?.data} columns={columns} rowKey="id" />;
}