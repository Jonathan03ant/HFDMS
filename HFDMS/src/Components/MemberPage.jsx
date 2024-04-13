import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export default function MemberPage() {
    const { memberId } = useParams();
    return (
        <>
            <h1> Member Page </h1>
        </>
    )
}