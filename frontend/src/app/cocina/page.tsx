'use client';
import { useMemo, useState, useEffect } from 'react';
import KitchenView from './KitchenView';
import { TableServices } from '../../services/TableServices';
import { useGlobalContext } from '../GlobalContext';
import { Table } from '../../models/table';

export default function CocinaPage() {
  const { isAuthenticated } = useGlobalContext();
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    TableServices.getAll().then(setTables);
  }, [isAuthenticated]);

  const activeOrders = useMemo(() => {
    return tables
      .filter((t) => t.order && t.order.orderDetail.length > 0)
      .map((t) => t.order!);
  }, [tables]);

  return <KitchenView activeOrders={activeOrders}/>;
}
