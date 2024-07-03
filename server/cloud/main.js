const wompi = require("./wompiCtrl");
const emailCtrl = require("./emailCtrl");

/**
 * Generate payment Link
 * Generates the link for the user
 * 
 * Errors:
 * 1 - User not found
 * 2 - Coupon is missing
 */
Parse.Cloud.define("generateLink", async (request) => {
    if (!request.user) return { success: false, code: 1 }
    if (!request.params.coupon) return { success: false, code: 2 }
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
    acl.setRoleReadAccess(companyRole, true)
    acl.setRoleWriteAccess(companyRole, true)
    receipt.setACL(acl)
    const savedReceipt = await receipt.save()
    const link = await wompi.createLink(coupon.get("title"), savedReceipt.id, coupon.get("price"))
    savedReceipt.set("linkId", link.data.id)
    await savedReceipt.save(null, { useMasterKey: true })
    return link
});
/**
 * Buy a free Coupon
 * Creates the receipt
 * 
 * Errors:
 * 1 - User not found
 * 2 - Coupon is missing
 * 3 - Coupon is not free
 */
Parse.Cloud.define("buyFreeCoupon", async (request) => {
    if (!request.user) return { success: false, code: 1 }
    if (!request.params.coupon) return { success: false, code: 2 }
    const coupon = await new Parse.Query("Coupon").include("company").get(request.params.coupon)
    const user = await new Parse.Query(Parse.User).get(request.user.id, { useMasterKey: true })
    if (coupon.get("price") !== 0) return { success: false, code: 3 }
    const Receipt = Parse.Object.extend("Receipt");
    const receipt = new Receipt();
    const companyRole = await new Parse.Query(Parse.Role).equalTo("name", coupon.get("company").get("name")).first()
    receipt.set("user", user);
    receipt.set("company", coupon.get("company"));
    receipt.set("coupon", coupon);
    receipt.set("active", true);
    receipt.set("available", true)
    const acl = new Parse.ACL()
    acl.setReadAccess(user.id, true)
    acl.setRoleReadAccess(companyRole, true)
    acl.setRoleWriteAccess(companyRole, true)
    receipt.setACL(acl)
    const savedReceipt = await receipt.save()
    if (coupon.get("haveAmount")) coupon.set("left", coupon.get("left") - 1);
    coupon.save(null, { useMasterKey: true });
    emailCtrl.send(user.get("email"), user.get("name"), coupon.get("description"), savedReceipt.id)
    return savedReceipt.id;
})

/**
 * Modify user ACL
 */
Parse.Cloud.afterSave(Parse.User, (request) => {
    if(request.original) return
    let acl = request.object.getACL()
    acl.setPublicReadAccess(true)
    request.object.setACL(acl)
    request.object.save(null,{useMasterKey: true})
})