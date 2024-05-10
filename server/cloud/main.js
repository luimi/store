const wompi = require("./wompiCtrl");

/**
 * Generate payment Link
 * Generates the link for the user
 * 
 * Errors:
 * 1 - User not found
 * 2 - Coupon is missing
 */
Parse.Cloud.define("generateLink", async (request) => {
    if(!request.user) return {success: false, code: 1}
    if(!request.params.coupon) return {success: false, code: 2}
    const Receipt = Parse.Object.extend("Receipt");
    const receipt = new Receipt();
    const coupon = await new Parse.Query("Coupon").include("company").get(request.params.coupon)
    const companyRole = await new Parse.Query(Parse.Role).equalTo("name", coupon.get("company").get("name")).first()
    receipt.set("user", request.user);
    receipt.set("company", coupon.get("company"));
    receipt.set("coupon", coupon);
    receipt.set("active", false);
    receipt.set("available", true)
    const acl = new Parse.ACL()
    acl.setReadAccess(request.user.id, true)
    acl.setRoleReadAccess(companyRole.id, true)
    acl.setRoleWriteAccess(companyRole.id, true)
    receipt.setACL(acl)
    const savedReceipt = await receipt.save()
    const link = await wompi.createLink(coupon.get("title"), savedReceipt.id, coupon.get("price"))
    savedReceipt.set("linkId", link.data.id)
    await savedReceipt.save(null, {useMasterKey: true})
    return link
});