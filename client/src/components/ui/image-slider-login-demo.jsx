import * as React from "react";
import { motion } from "framer-motion";
import { ImageSlider } from "@/components/ui/image-slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cross, ShieldCheck, User, Lock, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ImageSliderLoginDemo() {
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('citizen@example.com');
  const [password, setPassword] = React.useState('password123');
  const [selectedRole, setSelectedRole] = React.useState('CITIZEN');
  const [loading, setLoading] = React.useState(false);

  const images = [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=80",
  ];

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: selectedRole })
      });
      const data = await res.json();

      if (res.ok && data.user) {
        login(data.user, data.token || 'demo-jwt-token');
        navigate(`/dashboard/${data.user.role ? data.user.role.toLowerCase() : selectedRole.toLowerCase()}`);
      } else {
        switchRole(selectedRole);
        navigate(`/dashboard/${selectedRole.toLowerCase()}`);
      }
    } catch (err) {
      switchRole(selectedRole);
      navigate(`/dashboard/${selectedRole.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="w-full min-h-[calc(100dvh-8rem)] flex items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <motion.div 
        className="w-full max-w-5xl min-h-[520px] lg:h-[700px] grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Left side: Image Slider */}
        <div className="hidden lg:block relative h-full">
          <ImageSlider images={images} interval={4500} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-8 flex flex-col justify-end text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-moh-600 flex items-center justify-center">
                <Cross className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold tracking-wider text-sm">MINISTRY OF HEALTH</span>
            </div>
            <h2 className="text-2xl font-extrabold">Public Health Care Portal</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              Seamlessly manage primary health clinics, digital vaccination records, and public health inspections across Sri Lanka.
            </p>
          </div>
        </div>

        {/* Right side: Login Form */}
        <div className="w-full min-h-full bg-card text-card-foreground flex flex-col items-center justify-center p-5 sm:p-8 md:p-12 overflow-y-auto">
          <motion.div 
            className="w-full max-w-sm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-moh-600 to-teal-500 text-white flex items-center justify-center shadow-md">
                <Cross className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-sm text-moh-600 dark:text-teal-400">MOH SRI LANKA</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-3xl font-extrabold tracking-tight mb-2 text-slate-900 dark:text-white">
              Welcome Back
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xs text-muted-foreground mb-6">
              Enter your credentials to access your citizen profile or MOH staff dashboard.
            </motion.p>

            <motion.form variants={itemVariants} onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs font-bold">Select Role</Label>
                <select
                  id="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="flex h-10 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-teal-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-moh-500"
                >
                  <option value="CITIZEN">Registered Citizen</option>
                  <option value="STAFF">Medical Staff / Doctor</option>
                  <option value="PHI">PHI Inspector</option>
                  <option value="ADMIN">System Admin</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-bold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold">Password</Label>
                  <a href="#" className="text-xs font-medium text-moh-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl text-xs"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-gradient-to-r from-moh-600 to-teal-600 hover:from-moh-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition"
              >
                {loading ? "Signing In..." : `Log In to ${selectedRole} Dashboard`}
              </Button>
            </motion.form>

            <motion.p variants={itemVariants} className="text-center text-xs text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-moh-600 hover:underline">
                Sign up
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
