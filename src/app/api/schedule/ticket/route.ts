import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const domain = process.env.TOURKIT_CRM_DOMAIN;
    const apiKey = process.env.TOURKIT_CRM_API_KEY;

    if (!domain || !apiKey) {
      console.error('[Ticket API Error] Missing TOURKIT_CRM_DOMAIN or TOURKIT_CRM_API_KEY.');
      return NextResponse.json(
        { error: 'CRM Configuration missing' },
        { status: 500 }
      );
    }

    const response = await axios.post(`https://${domain}/api/Ticket/CreateTicket`, body, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      timeout: 15000
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('[Create Ticket Proxy Error]:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to submit ticket to CRM', details: error.message },
      { status: 500 }
    );
  }
}
