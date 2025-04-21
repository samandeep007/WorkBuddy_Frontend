import React from 'react'
import { useAuth } from '../../context/AuthProvider';
import OwnerDashboard from './OwnerDashboard';
import UserDashboard from './UserDashboard';
import UserLayout from '../../pages/UserLayout/UserLayout'

export default function Dashboard() {
  const {user} = useAuth();
  return (<UserLayout>{user.isOwner ? <OwnerDashboard/> : <UserDashboard/>}</UserLayout>)
}
