import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword') || '';
    const pageIndex = Number(searchParams.get('pageIndex')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 200; // Increased default to 200 for broader calendar view
    const sortby = Number(searchParams.get('sortby')) || 1;
    const marketId = Number(searchParams.get('marketId')) || -1;
    const startDateCI = searchParams.get('startDateCI') || '';
    const endDateCI = searchParams.get('endDateCI') || '';

    const domain = process.env.TOURKIT_CRM_DOMAIN;
    const apiKey = process.env.TOURKIT_CRM_API_KEY;

    if (!domain || !apiKey) {
      console.error('[Schedule API Error] Missing TOURKIT_CRM_DOMAIN or TOURKIT_CRM_API_KEY in environment variables.');
      return NextResponse.json(
        { error: 'CRM Configuration missing' },
        { status: 500 }
      );
    }

    const response = await axios.get(`https://${domain}/api/Ticket/ListTourSample`, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      data: {
        keyword,
        sortby,
        pageIndex,
        pageSize,
        startDateCI,
        endDateCI,
        startDateCO: '',
        endDateCO: '',
        marketId
      },
      timeout: 15000
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('[Schedule API Proxy Error]:', error.message || error);
    return NextResponse.json(
      { error: 'Failed to fetch schedule from CRM', details: error.message },
      { status: 500 }
    );
  }
}
