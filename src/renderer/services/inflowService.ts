import axios from "axios";
import { convertXmlToJs } from "../common/utils";

interface IInflowParameters {
  inflowUrl: string;
  inflowUser: string;
  inflowPassword: string;
}

interface IInflowType {
  id: string;
  name: string;
}

export async function getInflowTypes(
  params: IInflowParameters,
): Promise<IInflowType[]> {
  const { inflowPassword, inflowUrl, inflowUser } = params;
  const response = await axios.get(`${inflowUrl}/types/perf`, {
    headers: {
      "Content-Type": "application/xml",
      Authorization: `Basic ${btoa(`${inflowUser}:${inflowPassword}`)}`,
    },
    withCredentials: true,
  });
  const jsonData = convertXmlToJs(response.data);

  const types = jsonData.types[0].type.map(
    (el: { _attributes: { id: string; name: string } }) => ({
      id: el._attributes.id,
      name: el._attributes.name,
    }),
  );
  return types;
}

interface IInflowNode {
  name: string;
  inflowId: string;
  parentId?: string;
}

interface IXmlTree {
  application?: IXmlTree[];
  _attributes?: {
    id: string;
    name: string;
  };
}

function parseTree(data: IXmlTree, parentId?: string): IInflowNode[] {
  const nodes: IInflowNode[] = [];
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

export async function getInflowTree(
  params: IInflowParameters,
): Promise<IInflowNode[]> {
  const { inflowPassword, inflowUrl, inflowUser } = params;
  const response = await axios.get(`${inflowUrl}/tree`, {
    headers: {
      "Content-Type": "application/xml",
      Authorization: `Basic ${btoa(`${inflowUser}:${inflowPassword}`)}`,
    },
    withCredentials: true,
  });
  const jsonData = convertXmlToJs(response.data);
  const nodes = parseTree(jsonData.root[0]);
  return nodes;
}
