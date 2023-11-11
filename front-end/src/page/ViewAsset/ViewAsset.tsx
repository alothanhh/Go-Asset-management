import { Select, Button } from 'antd';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import './ViewAsset.css';
import AssetList from './AssetList';

type DepartmentDataType = {
  Id: number;
  Name: string;
}

const ViewAsset = () => {
  const role = localStorage.getItem("role");
  const intialDepartmentId = localStorage.getItem("id");

  const [departments, setDepartments] = useState<DepartmentDataType[]>([]);
  const [departmentOption, setDepartmentOption] = useState<{ label: string; value: string, id: number }[]>([]);
  const [department, setDepartment] = useState<{id: number, name: string}>({id: 0, name: ""});

  const url = 'http://localhost:8080/api/departments/';

  useEffect(() => {
    axios.get(url).then((response: { data: DepartmentDataType[] }) => {
      setDepartments(response.data);
    }).catch((error: any) => {
      alert(error);
    });
  }, [department]);

  useEffect(() => {
    // if(role === "1"){
    //   const intialDepartment = departments.find(items => items.id.toString() === intialDepartmentId);
    //   if(intialDepartment) setDepartment({id: intialDepartment.id, name: intialDepartment.name});
    // }
    // else if(role === "0"){
      setDepartmentOption([]);
      console.log({departments});
      departments.map((item) => {
      setDepartmentOption([...departmentOption, {
          label: item.Name,
          value: item.Name,
          id: item.Id,}])
      })
  }, [departments]);


  const onChange = (value: string, option: any) => {
    setDepartment({id: option.id, name: option.value});
  };
  
  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string, id: number }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


    return (
        <div className="Viewasset"> 
            <div className={`Viewasset--header`}>
                <Select
                    className='Viewasset--select'
                    showSearch
                    placeholder="Select department"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={departments.map(item => ({
                      label: item.Name, 
                      value: item.Name,
                      id: item.Id,
                    }))}
                />
                <Button type="primary" className='Viewasset--button'>Add asset</Button>
            </div>
            <AssetList departmentId={department.id} departmentName={department.name} />
        </div>
    );
  }
  
  export default ViewAsset;
  