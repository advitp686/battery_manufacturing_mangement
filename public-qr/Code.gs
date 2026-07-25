/*
 * Deploy this file as a Google Apps Script web app under the client's Google
 * account. Set Script Properties: SPREADSHEET_ID, SYNC_SECRET, SUPPORT_CONTACT.
 * The desktop client posts only redacted public pack records to doPost.
 */
function sheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  const ss = SpreadsheetApp.openById(id);
  let sheet = ss.getSheetByName('Public_QR');
  if (!sheet) { sheet = ss.insertSheet('Public_QR'); sheet.appendRow(['token','serial','model','chemistry','manufactureDate','status','warrantyEnd','updatedAt']); }
  return sheet;
}
function doPost(e) {
  const body = JSON.parse(e.postData.contents || '{}');
  if (body.secret !== PropertiesService.getScriptProperties().getProperty('SYNC_SECRET')) return json_({ok:false,error:'Unauthorized'});
  mirror_(body.entityType, body.entityId, body.payload);
  if (body.entityType !== 'BatteryPack') return json_({ok:true,mirrored:true});
  const p = body.payload; if (!p || !p.token) return json_({ok:false,error:'Missing public pack data'});
  const sheet = sheet_(), values = sheet.getDataRange().getValues(); let row = -1;
  for (let i=1;i<values.length;i++) if (values[i][0] === p.token) { row=i+1; break; }
  const record=[p.token,p.serial,p.model,p.chemistry,p.manufactureDate,p.status,p.warrantyEnd || '',new Date().toISOString()];
  if(row>0) sheet.getRange(row,1,1,record.length).setValues([record]); else sheet.appendRow(record);
  return json_({ok:true});
}
function mirror_(type, id, payload) {
  if (!type || !id) return;
  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'));
  const safeType = String(type).replace(/[^A-Za-z0-9_]/g, '');
  const name = 'Mirror_' + safeType;
  let sheet = ss.getSheetByName(name);
  if (!sheet) { sheet = ss.insertSheet(name); sheet.appendRow(['entityId','payload','updatedAt']); }
  const values = sheet.getDataRange().getValues(); let row = -1;
  for (let i=1;i<values.length;i++) if (values[i][0] === id) { row=i+1; break; }
  const record=[id,JSON.stringify(payload),new Date().toISOString()];
  if(row>0) sheet.getRange(row,1,1,record.length).setValues([record]); else sheet.appendRow(record);
}
function doGet(e) {
  const token = (e.parameter.t || '').trim();
  const support = PropertiesService.getScriptProperties().getProperty('SUPPORT_CONTACT') || '';
  let pack = null;
  if(token) { const values=sheet_().getDataRange().getValues(); for(let i=1;i<values.length;i++) if(values[i][0]===token){pack=values[i];break;} }
  if(!pack) return HtmlService.createHtmlOutput('<h2>Battery not recognized</h2><p>Please contact '+esc_(support)+'</p>');
  const active=pack[5] === 'Warranty active';
  const html='<main><h1>Battery verified</h1><p><b>Serial:</b> '+esc_(pack[1])+'</p><p><b>Model:</b> '+esc_(pack[2])+'</p><p><b>Manufactured:</b> '+esc_(pack[4])+'</p><p><b>Status:</b> '+esc_(pack[5])+'</p>'+(active?'<p><b>Warranty valid until:</b> '+esc_(pack[6])+'</p>':'<p>This pack has not yet been warranty-activated.</p>')+'<hr><p>'+esc_(support)+'</p></main>';
  return HtmlService.createHtmlOutput('<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font:16px Arial;background:#f4f7fb;margin:0}main{max-width:480px;margin:32px auto;background:#fff;padding:24px;border-radius:12px;box-shadow:0 2px 12px #0002}h1{color:#1769aa}</style>'+html);
}
function json_(data){return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);}
function esc_(value){return String(value || '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
