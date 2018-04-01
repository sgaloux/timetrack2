import axios from 'axios';
import { convertXmlToJs } from '../common';

interface InflowParameters {
  inflowUrl: string;
  inflowUser: string;
  inflowPassword: string;
}

interface InflowType {
  id: string;
  name: string;
}

export async function getInflowTypes(params: InflowParameters): Promise<InflowType[]> {
  const { inflowPassword, inflowUrl, inflowUser } = params;
  const response = await axios.get(`${inflowUrl}/types/perf`, {
    headers: {
      'Content-Type': 'application/xml',
      Authorization: `Basic ${btoa(`${inflowUser}:${inflowPassword}`)}`,
    },
    withCredentials: true,
  });
  const jsonData = convertXmlToJs(response.data);

  return jsonData.types[0].type.map((el: { _attributes: { id: string; name: string } }) => ({
    id: el._attributes.id,
    name: el._attributes.name,
  }));
}

interface InflowNode {
  name: string;
  inflowId: string;
  parentId?: string;
}

interface XmlTree {
  application?: XmlTree[];
  _attributes?: {
    id: string;
    name: string;
  };
}

function parseTree(data: XmlTree, parentId?: string): InflowNode[] {
  const nodes: InflowNode[] = [];
  if (data._attributes) {
    nodes.push({
      name: data._attributes.name,
      inflowId: data._attributes.id,
      parentId,
    });
  }
  if (data.application) {
    data.application.forEach((app) => {
      const nextParentId = data._attributes ? data._attributes.id : undefined;
      if (app.application) {
        nodes.push(...parseTree(app, nextParentId));
      }
    });
  }
  return nodes;
}

export async function getInflowTree(params: InflowParameters): Promise<InflowNode[]> {
  const { inflowPassword, inflowUrl, inflowUser } = params;
  const response = await axios.get(`${inflowUrl}/tree`, {
    headers: {
      'Content-Type': 'application/xml',
      Authorization: `Basic ${btoa(`${inflowUser}:${inflowPassword}`)}`,
    },
    withCredentials: true,
  });
  const jsonData = convertXmlToJs(response.data);
  return parseTree(jsonData.root[0]);
}
