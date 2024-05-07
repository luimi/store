const wompi = require("./wompiCtrl");

/**
 * Generate payment Link
 * Generates the link for the user
 * 
 * Errors:
 * 1 - User not found
 * 2 - Company or article is missing
 */
Parse.Cloud.define("generateLink", async (request) => {
    if(!request.user) return {success: false, code: 1}
    if(!request.params.company || !request.params.coupon) return {success: false, code: 2}
    const Receipt = Parse.Object.extend("Receipt");
    const receipt = new Receipt();
    const company = await new Parse.Query("Company").get(request.params.company)
    const coupon = await new Parse.Query("Coupon").get(request.params.coupon)
    const companyRole = await new Parse.Query(Parse.Role).equalTo("name", company.get("name")).first()
    receipt.set("user", request.user);
    receipt.set("company", company);
    receipt.set("coupon", coupon);
    receipt.set("active", false);
    const acl = new Parse.ACL()
    acl.setReadAccess(request.user.id, true)
    acl.setRoleReadAccess(companyRole.id, true)
    acl.setRoleWriteAccess(companyRole.id, true)
    receipt.setACL(acl)
    const savedReceipt = await receipt.save()
    const link = await wompi.createLink(coupon.get("title"), savedReceipt.id, coupon.get("price"))
    savedReceipt.set("linkId", link.id)
    await savedReceipt.save(null, {useMasterKey: true})
    return link
});