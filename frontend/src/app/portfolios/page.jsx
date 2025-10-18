"use client";
import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import PortfolioListDetails from '../../components/PortfolioListDetails';
import { fetchActivePortfolios } from '../../services/portfolios';

function getBidButton(selected) {
  // Simulação de lógica de bid, pois não há integração de usuário
  // Exemplo: se não houver bids, botão "Do Bid" habilitado
  // Se houver bids, botão "Blocked" ou "Outbid" com mensagem
  const userBid = null; // Simule lógica de usuário aqui
  const highestBid = selected.bids && selected.bids.length > 0 ? Math.max(...selected.bids.map(b => Number(b.amount))) : null;
  if (!userBid) {
    return <button style={{background:'#1a237e',color:'#fff',border:'none',borderRadius:4,padding:'0.7rem 1.5rem',fontWeight:600,cursor:'pointer'}}>Do Bid</button>;
  }
  if (userBid && userBid < highestBid) {
    return <button style={{background:'#eee',color:'#888',border:'none',borderRadius:4,padding:'0.7rem 1.5rem',fontWeight:600,cursor:'not-allowed'}} disabled>Outbid</button>;
  }
  if (userBid && userBid >= highestBid) {
    return <button style={{background:'#1a237e',color:'#fff',border:'none',borderRadius:4,padding:'0.7rem 1.5rem',fontWeight:600,cursor:'not-allowed'}} disabled>You are winning!</button>;
  }
}

export default function Page() {
  return (
    <PageLayout title="Portfolios" showBack={false}>
      <PortfolioListDetails
        fetchPortfolios={fetchActivePortfolios}
        rightMessage="Select a portfolio to see details."
        detailsCustom={getBidButton}
      />
    </PageLayout>
  );
}
